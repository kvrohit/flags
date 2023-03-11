export default function Header(props) {
  return (
    <header>
      <div className="bg-white px-8 py-4 border-b flex between">
        <div className="grow">
          Country <span className="font-semibold">Flags</span>
        </div>
        <div
          className={`font-mono text-zinc-500 ${
            props.count === 0 ? "hidden" : "auto"
          }`}
        >
          {props.count}
        </div>
      </div>
    </header>
  );
}
