import { useEffect, useState } from "react";

export default function useUrl({
  withoutSubdomain,
}: {
  withoutSubdomain?: boolean;
} = {}) {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const protocol = window.location.protocol;
    const host = window.location.hostname;
    const port = window.location.port;

    const hostname = withoutSubdomain ? host.replace("app.", "") : host;
    setUrl(new URL(protocol + hostname + ":" + port).toString());
  }, [withoutSubdomain]);

  return {
    appUrl: url,
  };
}
