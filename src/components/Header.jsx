export default function Header({ count = 3 }) {
  return (
    <header>
      <div className="px-8 py-4 border-b flex between">
        <div className="grow">
          Country <span className="font-semibold">Flags</span>
        </div>
        <div className={`font-mono text-zinc-500 ${count === 0 ? "hidden" : "auto"}`}>
          {count}
        </div>
      </div>
    </header>
  );
}
