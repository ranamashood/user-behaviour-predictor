import Button from "./components/Button";
import TextField from "./components/TextField";

function App() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField label="App Usage Time (min/day)" />
        <TextField label="Screen On Time (hours/day)" />
        <TextField label="Battery Drain (mAh/day)" />
        <TextField label="Number of Apps Installed" />
        <TextField label="Data Usage (MB/day)" />

        <Button title="Predict" />
      </form>
    </>
  );
}

export default App;
