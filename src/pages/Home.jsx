import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <div>
        <Link className="custom-link" to="/filldata">
          添加基础数据
        </Link>
      </div>
    </>
  );
}
