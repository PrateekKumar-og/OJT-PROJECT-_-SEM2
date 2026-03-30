import { useState, useContext } from "react";
import { LoanContext } from "../context/LoanContext";
import "./applyloan.css";

function ApplyLoan() {

    const [step, setStep] = useState(1);

    const { addLoan } = useContext(LoanContext);

    const [formData, setFormData] = useState({
        amount: "",
        type: "Personal",
        duration: "",
        purpose: ""
    });

    // INPUT CHANGE
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // VALIDATION
    const validateStep = () => {
        if (step === 1) {
            return formData.amount.trim() !== "" && formData.type.trim() !== "";
        }

        if (step === 2) {
            return formData.duration.trim() !== "" && formData.purpose.trim() !== "";
        }

        return true;
    };

    // NEXT
    const handleNext = () => {
        if (!validateStep()) {
            alert("Please fill all fields");
            return;
        }

        setStep((prev) => prev + 1);
    };

    // BACK
    const handleBack = () => {
        setStep((prev) => prev - 1);
    };

    // SUBMIT
    const handleSubmit = () => {
        if (!validateStep()) {
            alert("Incomplete form!");
            return;
        }

        addLoan(formData); // ✅ save

        console.log("Saved Loan:", formData);
        alert("Loan Application Submitted!");

        // RESET FORM
        setFormData({
            amount: "",
            type: "Personal",
            duration: "",
            purpose: ""
        });

        setStep(1);
    };

    return (
        <div className="apply-container">
            <div className="loan-form">

                <h1 className="form-title">Apply for Loan</h1>

                {/* STEP 1 */}
                {step === 1 && (
                    <>
                        <h2>Step 1: Loan Info</h2>

                        <label>Loan Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="Enter amount"
                        />

                        <label>Loan Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <option value="Personal">Personal</option>
                            <option value="Education">Education</option>
                            <option value="Business">Business</option>
                        </select>
                    </>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <>
                        <h2>Step 2: Details</h2>

                        <label>Duration (Months)</label>
                        <input
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            placeholder="e.g. 12"
                        />

                        <label>Purpose</label>
                        <textarea
                            name="purpose"
                            value={formData.purpose}
                            onChange={handleChange}
                            placeholder="Why do you need this loan?"
                        />
                    </>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <>
                        <h2>Step 3: Review</h2>

                        <div className="review-box">
                            <p><b>Amount:</b> {formData.amount || "-"}</p>
                            <p><b>Type:</b> {formData.type}</p>
                            <p><b>Duration:</b> {formData.duration || "-"}</p>
                            <p><b>Purpose:</b> {formData.purpose || "-"}</p>
                        </div>
                    </>
                )}

                {/* BUTTONS */}
                <div className="form-buttons">

                    {step > 1 && (
                        <button
                            type="button"
                            className="btn secondary"
                            onClick={handleBack}
                        >
                            Back
                        </button>
                    )}

                    {step < 3 ? (
                        <button
                            type="button"
                            className="btn primary"
                            onClick={handleNext}
                        >
                            Next →
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btn primary"
                            onClick={handleSubmit}
                        >
                            Submit Application
                        </button>
                    )}

                </div>

            </div>
        </div>
    );
}

export default ApplyLoan;