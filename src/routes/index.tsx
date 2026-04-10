import { createFileRoute } from "@tanstack/react-router";
import MainPage from "../components/layout/Main";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MainPage />;
}
