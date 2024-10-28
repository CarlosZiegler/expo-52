"use dom";

export default function DOMComponent({
  name,
  onClick,
}: {
  name: string;
  onClick: (message: string) => void;
}) {
  const handleClick = () => {
    onClick("hi from dom component");
  };
  return (
    <div
      style={{
        padding: 5,
        height: "100vh",
        backgroundColor: "blue",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "red", fontSize: 10, fontWeight: "bolder" }}>
        Hello, {name}
      </h1>
      <h1 style={{ color: "red", fontSize: 20, fontWeight: "bolder" }}>
        Hello, {name}
      </h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
