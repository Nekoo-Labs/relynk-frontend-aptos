"use client";

import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export default function AppRedirect() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const protocol = window.location.protocol;
    const host = window.location.hostname;
    const port = window.location.port;
    setUrl(new URL(protocol + "//app." + host + ":" + port).toString());
  }, []);

  return (
    <Button asChild>
      <a href={url}>App</a>
    </Button>
  );
}
