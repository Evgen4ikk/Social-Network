import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_index/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_index/"!</div>;
}
