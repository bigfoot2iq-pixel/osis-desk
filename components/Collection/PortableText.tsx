import {
  PortableText as PortableTextRenderer,
  type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="pt-p">{children}</p>,
    h2: ({ children }) => <h3 className="pt-h">{children}</h3>,
    h3: ({ children }) => <h4 className="pt-h pt-h-sm">{children}</h4>,
    h4: ({ children }) => <h4 className="pt-h pt-h-sm">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="pt-quote">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="pt-ul">{children}</ul>,
    number: ({ children }) => <ol className="pt-ol">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="pt-li">{children}</li>,
    number: ({ children }) => <li className="pt-li">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="pt-strong">{children}</strong>,
    em: ({ children }) => <em className="pt-em">{children}</em>,
    link: ({ children, value }) => {
      const href = (value as { href?: string } | undefined)?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          className="pt-link"
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
};

export default function PortableText({
  value,
}: {
  value: PortableTextBlock[];
}) {
  if (!value?.length) return null;
  return (
    <div className="pt">
      <PortableTextRenderer value={value} components={components} />
    </div>
  );
}
