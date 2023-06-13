import useGoogleSheets from "use-google-sheets";

const Sheets = () => {
  const { data, loading, error } = useGoogleSheets({
    apiKey: "AIzaSyAo8nz66MOvOxMV9PY6wb_-0ToNXM9JVAA",
    sheetId: "1tSyE9jYPtP5xf8tLIfhvyRWZ8Lv_91IPYnn8u9G8JLk",
  });
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);

    return <div>Error!</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default Sheets;
