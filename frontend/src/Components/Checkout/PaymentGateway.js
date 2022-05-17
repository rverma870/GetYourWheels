import React, { useEffect } from "react";
import { BsCreditCard2FrontFill, BsBank2 } from "react-icons/bs";
import { IoCaretForward } from "react-icons/io5";
import { FaCcVisa, FaCcMastercard, FaUser } from "react-icons/fa";

function PaymentGateway() {

  return (
    <>
      <div class="container py-5">
        <div class="row mb-4">
          <div class="col-lg-8 mx-auto text-center">
            <h1 class="display-6">Select Appropriate Payment Method</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-10 mx-auto">
            <div class="card ">
              <div class="card-header pb-0">
                <div class="rounded">
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item text-dark" role="presentation">
                      <button
                        class="nav-link active d-flex justify-content-evenly pb-0"
                        id="Card-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#Card"
                        type="button"
                        role="tab"
                        aria-controls="Card"
                        aria-selected="true"
                      >
                        <span class="fs-5 me-2">Card</span>
                        <BsCreditCard2FrontFill size={"1.7rem"} />
                      </button>
                    </li>
                    <li class="nav-item text-dark" role="presentation">
                      <button
                        class="nav-link d-flex justify-content-evenly pb-0"
                        id="UPI-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#UPI"
                        type="button"
                        role="tab"
                        aria-controls="UPI"
                        aria-selected="false"
                      >
                        <span class="fs-5 me-1">UPI</span>
                        <IoCaretForward size={"1.7rem"} />
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link d-flex justify-content-evenly pb-0"
                        id="NetBanking-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#NetBanking"
                        type="button"
                        role="tab"
                        aria-controls="NetBanking"
                        aria-selected="false"
                      >
                        <span class="fs-5 me-1">NetBanking</span>
                        <BsBank2 size={"1.7rem"} />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card-body">
                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="Card"
                    role="tabpanel"
                    aria-labelledby="Card-tab"
                  >
                    <form onsubmit="event.preventDefault()">
                      <div class="form-group">
                        <label for="username">
                          <h6>Card Owner</h6>
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            name="username"
                            placeholder="Card Owner Name"
                            required
                            class="form-control mb-1"
                          />
                          <div class="input-group-append">
                            <span class="input-group-text text-muted">
                              <FaUser size={"1.5rem"} />
                            </span>
                          </div>
                        </div>
                      </div>

                      <div class="form-group">
                        <label for="cardNumber">
                          <h6>Card number</h6>
                        </label>
                        <div class="input-group">
                          <input
                            type="text"
                            name="cardNumber"
                            placeholder="Valid card number"
                            class="form-control mb-1"
                            required
                          />
                          <div class="input-group-append">
                            <span class="input-group-text text-muted">
                              <FaCcVisa size={"1.5rem"} className="me-2" />
                              <FaCcMastercard size={"1.5rem"} />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-8">
                          <div class="form-group">
                            <label>
                              <span class="hidden-xs">
                                <h6>Expiration Date</h6>
                              </span>
                            </label>
                            <div class="input-group">
                              <input
                                type="number"
                                placeholder="MM"
                                name=""
                                class="form-control"
                                required
                              />
                              <input
                                type="number"
                                placeholder="YY"
                                name=""
                                class="form-control"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group mb-4">
                            <label
                              data-toggle="tooltip"
                              title="Three digit CV code on the back of your card"
                            >
                              <h6>
                                CVV
                                <i class="fa fa-question-circle d-inline"></i>
                              </h6>
                            </label>
                            <input type="text" required class="form-control" />
                          </div>
                        </div>
                      </div>
                      <div class="">
                        <button
                          type="button"
                          class="subscribe btn btn-primary btn-block shadow-sm"
                        >
                          Confirm Payment
                        </button>
                      </div>
                    </form>
                  </div>

                  <div
                    class="tab-pane fade"
                    id="UPI"
                    role="tabpanel"
                    aria-labelledby="UPI-tab"
                  >
                    <h6 class="pb-2">Select your paypal account type</h6>
                    <div class="form-group ">
                      <label class="radio-inline">
                        <input type="radio" name="optradio" checked /> Domestic
                      </label>
                      <label class="radio-inline">
                        <input type="radio" name="optradio" class="ml-5" />
                        International
                      </label>
                    </div>
                    <p>
                      <button type="button" class="btn btn-primary ">
                        <i class="fab fa-paypal mr-2"></i> Log into my Paypal
                      </button>
                    </p>
                    <p class="text-muted">
                      Note: After clicking on the button, you will be directed
                      to a secure gateway for payment. After completing the
                      payment process, you will be redirected back to the
                      website to view details of your order.
                    </p>
                  </div>

                  <div
                    class="tab-pane fade"
                    id="NetBanking"
                    role="tabpanel"
                    aria-labelledby="NetBanking-tab"
                  >
                    <div class="form-group ">
                      <label for="Select Your Bank">
                        <h6>Select your Bank</h6>
                      </label>
                      <select class="form-control" id="ccmonth">
                        <option value="" selected disabled>
                          --Please select your Bank--
                        </option>
                        <option>Bank 1</option>
                        <option>Bank 2</option>
                        <option>Bank 3</option>
                        <option>Bank 4</option>
                        <option>Bank 5</option>
                        <option>Bank 6</option>
                        <option>Bank 7</option>
                        <option>Bank 8</option>
                        <option>Bank 9</option>
                        <option>Bank 10</option>
                      </select>
                    </div>
                    <div class="form-group mt-4">
                      <p>
                        <button type="button" class="btn btn-primary ">
                          <i class="fas fa-mobile-alt mr-2"></i> Proceed Payment
                        </button>
                      </p>
                    </div>
                    <p class="text-muted">
                      Note: After clicking on the button, you will be directed
                      to a secure gateway for payment. After completing the
                      payment process, you will be redirected back to the
                      website to view details of your order.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentGateway;
