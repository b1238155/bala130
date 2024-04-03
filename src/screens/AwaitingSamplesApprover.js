import React from "react";

import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbartitleAddco from "../components/NavbartitleAddco";
import SidenavbarApprover from "../components/SidenavbarApprover";

export default function AwaitingSamples() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <NavbartitleAddco />

      <div className="d-flex">
        <SidenavbarApprover />
        <div className="main">
          <div className="mainitem">
            {/* --------------------Table Starts here---------------- */}
            <div className="topforsamplewaitingandviewall">
              <p
                onClick={() => navigate("ApproverDetails")}
                className="tableTop mt-3"
              >
                Samples awaiting Review
              </p>
              <a href="ApproverDetails" className="viewAll">
                View all
              </a>
            </div>
            <div>
              <Table className="table" border={1}>
                <thead className="tbhed">
                  <tr>
                    <th>S.No</th>
                    <th>TDS Number</th>
                    <th>Test Parameter</th>
                    <th>Analyst By</th>
                    <th>Reviewed By</th>

                    <th>View</th>
                  </tr>
                </thead>
                <tbody className="trAlign">
                  <tr>
                    <td>1</td>
                    <td>TDS/XRD/23/19923</td>
                    <td>PXRD,DSC</td>
                    <td>Ashok</td>
                    <td>Robert Fox</td>

                    <td>
                      <button
                        className="tbbutton "
                        onClick={() => navigate("ApproverDetails")}
                      >
                        View
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>2</td>
                    <td>TDS/XRD/23/19923</td>
                    <td>PXRD,DSC</td>
                    <td>Ashok</td>
                    <td>Robert Fox</td>
                    <td>
                      <button className="tbbutton ">View</button>
                    </td>
                  </tr>

                  <tr>
                    <td>3</td>
                    <td>TDS/XRD/23/19923</td>
                    <td>PXRD,DSC</td>
                    <td>Ashok</td>
                    <td>Robert Fox</td>
                    <td>
                      <button className="tbbutton ">View</button>
                    </td>
                  </tr>

                  <tr>
                    <td>4</td>
                    <td>TDS/XRD/23/19923</td>
                    <td>PXRD,DSC</td>
                    <td>Ashok</td>
                    <td>Robert Fox</td>
                    <td>
                      <button className="tbbutton ">View</button>
                    </td>
                  </tr>

                  <tr>
                    <td>5</td>
                    <td>TDS/XRD/23/19923</td>
                    <td>PXRD,DSC</td>
                    <td>Ashok</td>
                    <td>Robert Fox</td>
                    <td>
                      <button className="tbbutton ">View</button>
                    </td>
                  </tr>

                  <tr>
                    <td>6</td>
                    <td>TDS/XRD/23/19923</td>
                    <td>PXRD,DSC</td>
                    <td>Ashok</td>
                    <td>Robert Fox</td>
                    <td>
                      <button className="tbbutton ">View</button>
                    </td>
                  </tr>

                  <tr>
                    <td>7</td>
                    <td>TDS/XRD/23/19923</td>
                    <td>PXRD,DSC</td>
                    <td>Ashok</td>
                    <td>Robert Fox</td>
                    <td>
                      <button className="tbbutton ">View</button>
                    </td>
                  </tr>

                  <tr>
                    <td>8</td>
                    <td>TDS/XRD/23/19923</td>
                    <td>PXRD,DSC</td>
                    <td>Ashok</td>
                    <td>Robert Fox</td>
                    <td>
                      <button className="tbbutton ">View</button>
                    </td>
                  </tr>

                  <tr>
                    <td>9</td>
                    <td>TDS/XRD/23/19923</td>
                    <td>PXRD,DSC</td>
                    <td>Ashok</td>
                    <td>Robert Fox</td>
                    <td>
                      <button className="tbbutton ">View</button>
                    </td>
                  </tr>

                  <tr>
                    <td>10</td>
                    <td>TDS/XRD/23/19923</td>
                    <td>PXRD,DSC</td>
                    <td>Ashok</td>
                    <td>Robert Fox</td>
                    <td>
                      <button className="tbbutton ">View</button>
                    </td>
                  </tr>

                  <tr>
                    <td>11</td>
                    <td>TDS/XRD/23/19923</td>
                    <td>PXRD,DSC</td>
                    <td>Ashok</td>
                    <td>Robert Fox</td>
                    <td>
                      <button className="tbbutton ">View</button>
                    </td>
                  </tr>

                  <tr>
                    <td>12</td>
                    <td>TDS/XRD/23/19923</td>
                    <td>PXRD,DSC</td>
                    <td>Ashok</td>
                    <td>Robert Fox</td>
                    <td>
                      <button className="tbbutton ">View</button>
                    </td>
                  </tr>

                  <tr>
                    <td>13</td>
                    <td>TDS/XRD/23/19923</td>
                    <td>PXRD,DSC</td>
                    <td>Ashok</td>
                    <td>Robert Fox</td>
                    <td>
                      <button className="tbbutton ">View</button>
                    </td>
                  </tr>

                  <tr>
                    <td>14</td>
                    <td>TDS/XRD/23/19923</td>
                    <td>PXRD,DSC</td>
                    <td>Ashok</td>
                    <td>Robert Fox</td>
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
    </div>
  );
}
