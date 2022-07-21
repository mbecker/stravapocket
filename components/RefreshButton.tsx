export default function RefreshButton({ onClick }: { onClick?: React.MouseEventHandler }) {
  return (
    <button type="button" className="btn btn-secondary btn-circle" onClick={onClick}>
      <i className="ri-refresh-line" />
    </button>
  );
}
