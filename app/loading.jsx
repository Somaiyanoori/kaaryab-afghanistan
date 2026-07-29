import LoadingState from "../components/states/LoadingState.jsx";

export default function Loading() {
  return (
    <LoadingState
      fullPage
      size="lg"
      title="Loading..."
      description="Please wait a moment"
    />
  );
}
