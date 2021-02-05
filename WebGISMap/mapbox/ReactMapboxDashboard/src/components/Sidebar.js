import React, { Component } from "react";

class Sidebar extends Component {
    render() {
        const style = {
            backgroundColor: "#EEEEEE",
            // I am not sure why scroll bar appears when width is 20vw
            width: "14.7vw",
        };

        const liStyle = {
            listStyle: "none",
            padding: "15px 10px",
            borderBottom: "1px solid rgba(100, 100, 100, 0.3)"
        };

        const inputStyle = {
            margin: "15px 10px",
        };

        return (
            <div style={style}>
                <div style = {{margin: "10px 10px 20px 10px", border: "2px solid #ccc"}}>
                    <ul style={{margin: "16px", padding: "0px"}}>
                        <li style={liStyle}>Map Tools</li>
                        <li style={liStyle}>GeoCode Search</li>
                        <li style={liStyle}>Radius</li>
                        <li style={liStyle}>Area</li>
                    </ul>
                </div>

                <div style = {{margin: "10px 10px 10px 10px", border: "2px solid #ccc"}}>
                    <select style={inputStyle}>
                        <option value="volvo">Comp</option>
                    </select>
                </div>

                <div style = {{margin: "10px 10px 10px 10px", border: "2px solid #ccc"}}>
                    <br/><br/><br/>
                    <input type="radio" name="gender" value="male"/> MHHI<br/><br/><br/>
                    <input type="radio" name="gender" value="female"/> AHHI<br/><br/><br/>
                    <input type="radio" name="gender" value="other"/> PopDen<br/><br/><br/>
                </div>
            </div>
        )
    }
}

export default Sidebar;