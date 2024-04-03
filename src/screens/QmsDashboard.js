import React from "react";
import Sidenavbar from "../components/Sidenavbar";

import {
  Table,
  Row,
  Col,
  // Button,
  Card,
} from "react-bootstrap";

import { TbClockEdit } from "react-icons/tb";
import { FaRegListAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import NavbartitleAddco from "../components/NavbartitleAddco";

export default function ReviewDashboard() {
  const navigate = useNavigate();
  return (
    <div className="app">
      <NavbartitleAddco />

      <div className="d-flex">
        <Sidenavbar />
        <div className="main">
          <div className="mainitem">
            {/* -----------------------------------------Top Card Start---------------------------------- */}

            <div className="mt-4 row wholeCardDiv">
              <div>
                <p className="overview">Overview</p>
              </div>
              <Row>
                <Col md={3}>
                  <Card className="mainCard1 p-2">
                    <div className="cardArrangement">
                      <div style={{ justifyContent: "space-evenly" }}>
                        <p>Total Reject</p>
                        <p className="cardNum">25</p>
                      </div>
                      <div>
                        <FaRegListAlt size={50} color="#fff" />
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="mainCard2 p-2">
                    <div className="cardArrangement">
                      <div style={{ justifyContent: "space-evenly" }}>
                        <p>Rejected by Reviewer</p>
                        <p className="cardNum">19</p>
                      </div>
                      <div>
                        <FiEdit size={50} color="#fff" />
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card
                    className="mainCard2 p-2"
                    onClick={() => navigate("AwaitingSamplesReview")}
                  >
                    <div className="cardArrangement">
                      <div>
                        <p>Rejected by Approver</p>
                        <p className="cardNum">06</p>
                      </div>
                      <div>
                        <TbClockEdit size={50} color="#fff" />
                      </div>
                    </div>
                  </Card>
                </Col>

                <Col md={3}>
                  <Card
                    className="mainCard2 p-2"
                    onClick={() => navigate("AwaitingSamplesReview")}
                  >
                    <div className="cardArrangement">
                      <div>
                        <p> Retest Done</p>
                        <p className="cardNum">06</p>
                      </div>
                      <div>
                        <TbClockEdit size={50} color="#fff" />
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
              {/* -----------------------------------------Top Card Ended---------------------------------- */}

              <div className="topforsamplewaitingandviewall">
                <p className="tableTop mt-3">Samples awaiting Review</p>

                <p className="viewAll">View all</p>
              </div>
              <div>
                <Table className="table" border={1}>
                  <thead className="tbhed">
                    <tr style={{ backgroundColor: "#3a4175" }}>
                      <th>S.No</th>
                      <th>TDS Number</th>
                      <th>Rejected Date</th>
                      <th>Rejected By</th>

                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody className="trAlign">
                    <tr>
                      <td>1</td>
                      <td>TDS/XRD/23/19923</td>
                      <td>01/8/2023</td>
                      <td>Jane Cooper(Reviewer)</td>

                      <td>
                        <button className="tbbutton ">View</button>
                      </td>
                    </tr>

                    <tr>
                      <td>2</td>
                      <td>TDS/XRD/23/19923</td>
                      <td>01/8/2023</td>
                      <td>Jane Cooper(Reviewer)</td>

                      <td>
                        <button className="tbbutton ">View</button>
                      </td>
                    </tr>

                    <tr>
                      <td>3</td>
                      <td>TDS/XRD/23/19923</td>
                      <td>01/8/2023</td>
                      <td>Jane Cooper(Reviewer)</td>

                      <td>
                        <button className="tbbutton ">View</button>
                      </td>
                    </tr>

                    <tr>
                      <td>4</td>
                      <td>TDS/XRD/23/19923</td>
                      <td>01/8/2023</td>
                      <td>Jane Cooper(Reviewer)</td>

                      <td>
                        <button className="tbbutton ">View</button>
                      </td>
                    </tr>

                    <tr>
                      <td>5</td>
                      <td>TDS/XRD/23/19923</td>
                      <td>01/8/2023</td>
                      <td>Jane Cooper(Reviewer)</td>

                      <td>
                        <button className="tbbutton ">View</button>
                      </td>
                    </tr>

                    <tr>
                      <td>6</td>
                      <td>TDS/XRD/23/19923</td>
                      <td>01/8/2023</td>
                      <td>Jane Cooper(Reviewer)</td>

                      <td>
                        <button className="tbbutton ">View</button>
                      </td>
                    </tr>

                    <tr>
                      <td>7</td>
                      <td>TDS/XRD/23/19923</td>
                      <td>01/8/2023</td>
                      <td>Jane Cooper(Reviewer)</td>

                      <td>
                        <button className="tbbutton ">View</button>
                      </td>
                    </tr>

                    <tr>
                      <td>8</td>
                      <td>TDS/XRD/23/19923</td>
                      <td>01/8/2023</td>
                      <td>Jane Cooper(Reviewer)</td>

                      <td>
                        <button className="tbbutton ">View</button>
                      </td>
                    </tr>

                    <tr>
                      <td>9</td>
                      <td>TDS/XRD/23/19923</td>
                      <td>01/8/2023</td>
                      <td>Jane Cooper(Reviewer)</td>

                      <td>
                        <button className="tbbutton ">View</button>
                      </td>
                    </tr>

                    <tr>
                      <td>10</td>
                      <td>TDS/XRD/23/19923</td>
                      <td>01/8/2023</td>
                      <td>Jane Cooper(Reviewer)</td>

                      <td>
                        <button className="tbbutton ">View</button>
                      </td>
                    </tr>

                    <tr>
                      <td>11</td>
                      <td>TDS/XRD/23/19923</td>
                      <td>01/8/2023</td>
                      <td>Jane Cooper(Reviewer)</td>

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
    </div>
  );
}
