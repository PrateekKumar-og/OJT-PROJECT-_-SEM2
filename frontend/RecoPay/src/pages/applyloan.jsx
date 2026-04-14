import { useState, useContext } from "react";
import { LoanContext } from "../context/LoanContext";
import { useToast } from "../context/ToastContext";
import "./applyloan.css";

function ApplyLoan() {

    const { addLoan } = useContext(LoanContext);
    const toast = useToast();

    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        amount: "",
        type: "Personal",
        duration: "",
        purpose: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateStep = () => {
        if (step === 1) {
            if (!formData.amount || Number(formData.amount) <= 0) {
                toast.error("Please enter a valid amount");
                return false;
            }
            return true;
        }

        if (step === 2) {
            if (!formData.duration || Number(formData.duration) <= 0) {
                toast.error("Please enter a valid duration");
                return false;
            }
            if (!formData.purpose.trim()) {
                toast.error("Please enter the purpose");
                return false;
            }
            return true;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateStep()) return;

        try {
            setSubmitting(true);
            await addLoan(formData);
            toast.success("Loan Application Submitted! 🎉");

            setFormData({
                amount: "",
                type: "Personal",
                duration: "",
                purpose: ""
            });
            setStep(1);
        } catch (err) {
            toast.error("Failed to submit loan. Try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="apply-container">
            <div className="loan-form">

                <h1 className="form-title">Apply for a Loan</h1>

                {step === 1 && (
                    <>
                        <h2>Step 1 — Basic Information</h2>

                        <label>Amount (₹)</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="e.g. 50000"
                        />

                        <label>Loan Type</label>
                        <select name="type" value={formData.type} onChange={handleChange}>
                            <option>Personal</option>
                            <option>Education</option>
                            <option>Business</option>
                            <option>Housing</option>
                            <option>Vehicle</option>
                        </select>

                        <div className="form-buttons">
                            <button className="btn primary" onClick={() => {
                                if (validateStep()) setStep(2);
                            }}>
                                Next →
                            </button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2>Step 2 — Loan Details</h2>

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
                            placeholder="Describe the purpose of this loan..."
                        ></textarea>

                        <div className="form-buttons">
                            <button className="btn secondary" onClick={() => setStep(1)}>
                                ← Back
                            </button>
                            <button className="btn primary" onClick={() => {
                                if (validateStep()) setStep(3);
                            }}>
                                Review →
                            </button>
                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <h2>Step 3 — Review & Submit</h2>

                        <div className="review-box">
                            <p><b>Amount</b> ₹{Number(formData.amount).toLocaleString()}</p>
                            <p><b>Type</b> {formData.type}</p>
                            <p><b>Duration</b> {formData.duration} months</p>
                            <p><b>Purpose</b> {formData.purpose}</p>
                            <p><b>Monthly EMI</b> ₹{Math.ceil(Number(formData.amount) / Number(formData.duration)).toLocaleString()}</p>
                        </div>

                        <div className="form-buttons">
                            <button className="btn secondary" onClick={() => setStep(2)}>
                                ← Back
                            </button>
                            <button className="btn primary" onClick={handleSubmit} disabled={submitting}>
                                {submitting ? "Submitting..." : "Submit Application ✓"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ApplyLoan;