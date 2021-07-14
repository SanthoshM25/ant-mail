import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const History = () => {
  const [history, setHistory] = useState([]);

  const singleHistory = useHistory();
  const clickHandler = (h) => {
    return singleHistory.push("/singlehistory/" + h._id);
  };

  useEffect(() => {
    axios
      .get(" http://localhost:3001/posts/history")
      .then((histories) => {
        setHistory(histories.data);
      })
      .catch((err) => {
        console.log(`error: ${err}`);
        alert('something went wrong')
      });
  }, []);

  return (
    <div className="history">
      <div className="history-container">
        <div className="sidebar">
          <Link to="/home">Home</Link>
          <Link to="#" className="histo-sidebar">
            History
          </Link>
        </div>
        <div className="history-listing">
          {history.map((h) => (
            <div className="history-card" key={h._id}>
              <div onClick={() => clickHandler(h)}>
                <h2>{h.sub}</h2>
                <h3>{h.to}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
