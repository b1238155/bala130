import React from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbartitleAddco from "../components/NavbartitleAddco";
import SidenavbarAnalyst from "../components/SidenavbarAnalyst";

export default function AwaitingSamples() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <NavbartitleAddco />

      <div className="d-flex">
        <SidenavbarAnalyst />

        <div className="main">
          <div className="mainitem">
            {/* --------------------Table Starts here---------------- */}
            <div className="topforsamplewaitingandviewall">
              <p
                className="tableTop mt-3"
                onClick={() => navigate("AnalystBatchandRLPLdetails")}
              >
                Samples awaiting testing
              </p>
              <a href="AnalystBatchandRLPLdetails" className="viewAll">
                View all
              </a>
            </div>
            <Table className="table mt-3" border={1}>
              <thead className="tbhed">
                <tr>
                  <th>S.No</th>
                  <th>Reference Number</th>
                  <th>SRO Submitted By</th>
                  <th>DIT Reviewed By</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody className="trAlign">
                <tr>
                  <td>1</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>
                    <button
                      className="tbbutton "
                      onClick={() => navigate("AnalystBatchandRLPLdetails")}
                    >
                      View
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>2</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>
                    <button className="tbbutton ">View</button>
                  </td>
                </tr>

                <tr>
                  <td>3</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>
                    <button className="tbbutton ">View</button>
                  </td>
                </tr>

                <tr>
                  <td>4</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>
                    <button className="tbbutton ">View</button>
                  </td>
                </tr>

                <tr>
                  <td>5</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>
                    <button className="tbbutton ">View</button>
                  </td>
                </tr>

                <tr>
                  <td>6</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>
                    <button className="tbbutton ">View</button>
                  </td>
                </tr>

                <tr>
                  <td>7</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>
                    <button className="tbbutton ">View</button>
                  </td>
                </tr>

                <tr>
                  <td>8</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>
                    <button className="tbbutton ">View</button>
                  </td>
                </tr>

                <tr>
                  <td>9</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>
                    <button className="tbbutton ">View</button>
                  </td>
                </tr>

                <tr>
                  <td>10</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>
                    <button className="tbbutton ">View</button>
                  </td>
                </tr>

                <tr>
                  <td>11</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>
                    <button className="tbbutton ">View</button>
                  </td>
                </tr>

                <tr>
                  <td>12</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>
                    <button className="tbbutton ">View</button>
                  </td>
                </tr>

                <tr>
                  <td>13</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>
                    <button className="tbbutton ">View</button>
                  </td>
                </tr>

                <tr>
                  <td>14</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>XXXXX</td>
                  <td>
                    <button className="tbbutton ">View</button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
