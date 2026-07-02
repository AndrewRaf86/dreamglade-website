"use client";

import Link from "next/link";
import { trackEvent, type TrackedEventName } from "@/lib/analytics";
import type { CSSProperties, ReactNode } from "react";

export default function TrackedLink({
  href,
  event,
  properties,
  className,
  style,
  target,
  rel,
  children,
}: {
  href: string;
  event: TrackedEventName;
  properties?: Record<string, string>;
  className?: string;
  style?: CSSProperties;
  target?: string;
  rel?: string;
  children: ReactNode;
}) {
  const handleClick = () => trackEvent(event, properties);

  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} target={target} rel={rel} className={className} style={style} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} style={style} onClick={handleClick}>
      {children}
    </Link>
  );
}
