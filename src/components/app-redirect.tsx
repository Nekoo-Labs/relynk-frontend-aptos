"use client";

import { Button } from "./ui/button";

export default function AppRedirect() {
  const protocol = window.location.protocol;
  const host = window.location.hostname;
  const url = new URL(protocol + "//app." + host);

  return (
    <Button asChild>
      <a href={url.toString()}>App</a>
    </Button>
  );
}
