import { Dashboard } from "@mui/icons-material";
import { useLayoutEffect } from "react";
import { useState } from "react";
import HeliosAlert from "../../components/Alert";
import "../../styles/manage.css";

export default function Universal({ token, setToken, perms, needed }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [alertContent, setAlertContent] = useState("");

  function redirect() {
    <Dashboard setToken={setToken} />;
  }

  useLayoutEffect(() => {
    if (!perms || !perms.includes(needed)) {
      redirect()
    }
  });

  return (
    <div className="App">
      {showAlert && <HeliosAlert text={alertContent} type={alertType} />}
    </div>
  );
}
