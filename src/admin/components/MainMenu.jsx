import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { DesktopOutlined } from "@ant-design/icons";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("MBT", "MBT", <DesktopOutlined />, [
    getItem("原子粒度模型", "/module/nodeList"),
    getItem("公共模型", "/module/publicModule"),
  ]),
];

function MainMenu() {
  const nav = useNavigate();
  const cr = useLocation();
  const selected = () => {
    switch (true) {
      case cr.pathname.toLowerCase().includes("public"):
        return ["/module/publicModule"];
      case cr.pathname.toLowerCase().includes("private"):
        return ["/module/privateModule"];
      default:
        return [cr.pathname];
    }
  };
  const openkey = () => {
    switch (true) {
      case cr.pathname.toLowerCase().includes("module"):
        return ["MBT"];
      case cr.pathname.toLowerCase().includes("demand"):
        return ["demand"];
      default:
        return [cr.pathname];
    }
  };
  const menuClick = (e) => {
    nav(e.key);
  };
  return (
    <Menu
      theme="dark"
      selectedKeys={selected()}
      mode="inline"
      items={items}
      onClick={menuClick}
      defaultOpenKeys={openkey()}
    />
  );
}

export default MainMenu;
