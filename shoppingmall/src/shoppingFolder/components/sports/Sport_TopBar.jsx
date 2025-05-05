
import "../../../App.css";
import "../css/Sport_TopBar.css";
import { Link } from "react-router-dom";
import { Home, PlusCircle } from "lucide-react";

const Sport_TopBar = ({ isOwner }) => {
  return (
    <div>
      <div className="sport-top-bar">
        <div className="sport-top-bar-content">
          <Link to="/home" className="home-title">
            <span className="home-icon">
              <Home size={18} strokeWidth={2.5} />
            </span>
            Home
          </Link>
          
          <div className="navbar-items">
            {isOwner && (
              <Link to="/sport/owner/create" className="create-link">
                <PlusCircle size={18} />
                Create
              </Link>
            )}
          </div>
        </div>
      </div>
      <hr className="sport-divider" />
    </div>
  );
};

export default Sport_TopBar;