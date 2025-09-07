export default function LoadingSpinner({ loadingMessage }) {
  return (
    <div className="ui segment loading_spinner">
      <div className="ui active inverted dimmer">
        <div className="ui large text loader">{loadingMessage}</div>
      </div>
    </div>
  );
}
