function Cutoff() {
  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                <h6 className="text-white text-capitalize ps-3">Cutoff</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="p-4">
                {/* Info Cards */}
                <div className="row mb-4">
                  <div className="col-xl-4 col-sm-6 mb-4">
                    <div className="card">
                      <div className="card-body p-3">
                        <div className="row">
                          <div className="col-8">
                            <div className="numbers">
                              <p className="text-sm mb-0 text-capitalize font-weight-bold">Current Cutoff</p>
                              <h5 className="font-weight-bolder mb-0">
                                Sept 1 - Sept 15, 2025
                              </h5>
                            </div>
                          </div>
                          <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                              <i className="ni ni-watch-time text-lg opacity-10" aria-hidden="true"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-sm-6 mb-4">
                    <div className="card">
                      <div className="card-body p-3">
                        <div className="row">
                          <div className="col-8">
                            <div className="numbers">
                              <p className="text-sm mb-0 text-capitalize font-weight-bold">Total Hours</p>
                              <h5 className="font-weight-bolder mb-0">
                                80
                              </h5>
                            </div>
                          </div>
                          <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-success shadow text-center border-radius-md">
                              <i className="ni ni-time-alarm text-lg opacity-10" aria-hidden="true"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-sm-6 mb-4">
                    <div className="card">
                      <div className="card-body p-3">
                        <div className="row">
                          <div className="col-8">
                            <div className="numbers">
                              <p className="text-sm mb-0 text-capitalize font-weight-bold">Overtime</p>
                              <h5 className="font-weight-bolder mb-0">
                                5
                              </h5>
                            </div>
                          </div>
                          <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-info shadow text-center border-radius-md">
                              <i className="ni ni-bold text-lg opacity-10" aria-hidden="true"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Table for Cutoff Details */}
                <div className="card">
                  <div className="card-header pb-0">
                    <h6>Cutoff Breakdown</h6>
                    <p className="text-sm">
                      <i className="fa fa-info text-info" aria-hidden="true"></i>
                      Detailed view of employee hours and pay
                    </p>
                  </div>
                  <div className="card-body px-0 pt-0 pb-2">
                    <div className="table-responsive p-0">
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Employee</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Total Hours</th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Overtime</th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Pay</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div>
                                  <img src="../assets/img/team-2.jpg" className="avatar avatar-sm me-3 border-radius-lg" alt="user1" />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">John Doe</h6>
                                  <p className="text-xs text-secondary mb-0">john.doe@example.com</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-xs font-weight-bold mb-0">80</p>
                              <p className="text-xs text-secondary mb-0">Hours</p>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <span className="badge badge-sm bg-gradient-success">5</span>
                            </td>
                            <td className="align-middle text-center">
                              <span className="text-secondary text-xs font-weight-bold">$800</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div>
                                  <img src="../assets/img/team-4.jpg" className="avatar avatar-sm me-3 border-radius-lg" alt="user2" />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">Jane Smith</h6>
                                  <p className="text-xs text-secondary mb-0">jane.smith@example.com</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-xs font-weight-bold mb-0">76</p>
                              <p className="text-xs text-secondary mb-0">Hours</p>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <span className="badge badge-sm bg-gradient-success">2</span>
                            </td>
                            <td className="align-middle text-center">
                              <span className="text-secondary text-xs font-weight-bold">$760</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cutoff;