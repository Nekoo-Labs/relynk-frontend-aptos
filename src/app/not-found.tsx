import PageLayout from "@/components/layouts/page-layout";

export default function NotFoundPage() {
  return (
    <PageLayout
      className="flex flex-col items-center justify-center px-4"
      needWallet={false}
    >
      <h1 className="text-3xl text-primary">
        <b>404</b> | Not Found
      </h1>
      <p className="text-secondary-foreground">
        The page you are looking for does not exist.
      </p>
    </PageLayout>
  );
}
