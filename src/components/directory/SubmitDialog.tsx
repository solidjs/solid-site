import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import { createSignal, For, Show } from "solid-js";
import { useI18n } from "../../i18n";
import { CATEGORY_LABELS, ResourceCategory, type PackageType, type ResourceType } from "../../ecosystem/types";
import { URLS } from "../../site";
import { Button } from "../Button";
import { Dialog } from "../Dialog";
import { Icon } from "../Icon";
import styles from "./SubmitDialog.module.css";

const PACKAGE_TYPES: PackageType[] = ["library", "package"];
const RESOURCE_TYPES: ResourceType[] = ["article", "video", "podcast"];
const CHOICES = Object.values(ResourceCategory).filter((c) => c !== "educational");
const SINGULAR: Record<string, string> = { article: "Article", video: "Video", podcast: "Podcast", library: "Library", package: "Package" };

/** A quoted TypeScript string, so the maintainer can paste the entry into the data file as it is. */
const q = (s: string) => `'${s.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\r?\n/g, " ")}'`;

/**
 * "Submit yours" button and form. There is no server to receive it: submitting opens a new issue on the website's
 * GitHub repository with the details filled in (and the data-file entry ready to paste), so a maintainer reviews it in
 * public before anything is listed.
 */
export function SubmitDialog(props: { kind: "package" | "resource" }) {
  const { t } = useI18n();
  const isPackage = () => props.kind === "package";
  const [chosen, setChosen] = createSignal<ResourceCategory[]>([]);
  const types = () => (isPackage() ? PACKAGE_TYPES : RESOURCE_TYPES);

  function onSubmit(e: SubmitEvent) {
    e.preventDefault();
    const form = new FormData(e.currentTarget as HTMLFormElement);
    const field = (name: string) => String(form.get(name) ?? "").trim();
    const type = field("type");
    const categories = isPackage() ? CHOICES.filter((c) => chosen().includes(c)) : ["educational"];
    const title = field("title");
    const author = field("author");
    const authorUrl = field("author_url");

    const entry = [
      "{",
      `  link: ${q(field("link"))},`,
      `  title: ${q(title)},`,
      `  description: ${q(field("description"))},`,
      author ? `  author: ${q(author)},` : "",
      authorUrl ? `  author_url: ${q(authorUrl)},` : "",
      `  type: ${isPackage() ? "PackageType" : "ResourceType"}.${type[0].toUpperCase()}${type.slice(1)},`,
      `  categories: [${categories.map((c) => `ResourceCategory.${Object.entries(ResourceCategory).find(([, v]) => v === c)?.[0]}`).join(", ")}],`,
      isPackage() ? `  added_at: ${Date.now()},` : `  published_at: ${Date.now()},`,
      "},",
    ]
      .filter(Boolean)
      .join("\n");

    const body = [
      `**Type:** ${SINGULAR[type]}`,
      `**Name:** ${title}`,
      `**Link:** ${field("link")}`,
      `**Description:** ${field("description")}`,
      author ? `**Author:** ${author}${authorUrl ? ` (${authorUrl})` : ""}` : "",
      isPackage() ? `**Categories:** ${categories.map((c) => CATEGORY_LABELS[c as ResourceCategory]).join(", ") || "none chosen"}` : "",
      "",
      `Entry for \`src/ecosystem/${isPackage() ? "utilities" : type === "article" ? "articles" : type === "video" ? "videos" : "podcasts"}.ts\`:`,
      "```ts",
      entry,
      "```",
    ]
      .filter((line, i, all) => line !== "" || all[i - 1] !== "")
      .join("\n");

    const url = new URL(`${URLS.githubSiteRepo}/issues/new`);
    url.searchParams.set("title", `${isPackage() ? "Ecosystem" : "Resource"} submission: ${title}`);
    url.searchParams.set("body", body);
    url.searchParams.set("labels", isPackage() ? "ecosystem" : "resources");
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <Dialog
      triggerClass={styles.trigger}
      trigger={<>{t(isPackage() ? "Submit your project" : "Submit a resource")}</>}
      title={t(isPackage() ? "Submit your project" : "Submit a resource")}
      description={t("This opens a pre-filled issue on GitHub. A maintainer reviews every submission before it is listed. You need a GitHub account.")}
    >
      <form class={styles.form} onSubmit={onSubmit}>
        <label class={styles.field}>
          <span>{t("Type")}</span>
          <select name="type" required>
            <For each={types()} keyed={(ty) => ty}>{(ty) => <option value={ty()}>{t(SINGULAR[ty()])}</option>}</For>
          </select>
        </label>
        <label class={styles.field}>
          <span>{t("Name")}</span>
          <input name="title" required maxlength="120" autocomplete="off" />
        </label>
        <label class={styles.field}>
          <span>{t("Link")}</span>
          <input name="link" type="url" required placeholder="https://" autocomplete="off" />
        </label>
        <label class={styles.field}>
          <span>{t("Description")}</span>
          <textarea name="description" required rows="3" maxlength="400" />
        </label>
        <div class={styles.row}>
          <label class={styles.field}>
            <span>{t("Author")} <small>({t("optional")})</small></span>
            <input name="author" autocomplete="off" />
          </label>
          <label class={styles.field}>
            <span>{t("Author link")} <small>({t("optional")})</small></span>
            <input name="author_url" type="url" placeholder="https://" autocomplete="off" />
          </label>
        </div>
        <Show when={isPackage()}>
          <div class={styles.field}>
            <span id="submit-categories">{t("Categories")}</span>
            <DropdownMenu placement="bottom-start" gutter={4} sameWidth>
              <DropdownMenu.Trigger class={styles.select} aria-labelledby="submit-categories">
                <span class={styles.selectValue}>
                  {chosen().length ? chosen().map((c) => t(CATEGORY_LABELS[c])).join(", ") : t("Select categories")}
                </span>
                <Icon name="chevron-down" size={16} />
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content class={styles.menu}>
                  <For each={CHOICES} keyed={(c) => c}>
                    {(c) => (
                      <DropdownMenu.CheckboxItem
                        class={styles.option}
                        closeOnSelect={false}
                        checked={chosen().includes(c())}
                        onChange={(on: boolean) => setChosen((cur) => (on ? [...cur, c()] : cur.filter((x) => x !== c())))}
                      >
                        <span class={styles.box} aria-hidden="true">
                          <DropdownMenu.ItemIndicator><Icon name="check" size={12} /></DropdownMenu.ItemIndicator>
                        </span>
                        {t(CATEGORY_LABELS[c()])}
                      </DropdownMenu.CheckboxItem>
                    )}
                  </For>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu>
          </div>
        </Show>
        <Button type="submit" variant="primary" iconAfter="arrow-up-right">{t("Continue on GitHub")}</Button>
      </form>
    </Dialog>
  );
}
