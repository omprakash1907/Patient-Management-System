// controllers/paymentController.js
const paypal = require('@paypal/checkout-server-sdk');
const Prescription = require('../models/Prescription');

// PayPal environment setup
const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
const client = new paypal.core.PayPalHttpClient(environment);

// Initiate PayPal payment
exports.initiatePayment = async (req, res) => {
    const { prescriptionId } = req.params; // Prescription ID from the URL parameter
    try {
        // Fetch the prescription to get the total payable amount
        const prescription = await Prescription.findById(prescriptionId);
        if (!prescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }

        const totalAmount = prescription.totalPrice;

        // Create the order for PayPal
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [{
                amount: {
                    currency_code: "USD",
                    value: totalAmount.toString()
                }
            }],
            application_context: {
                brand_name: "Your App Name",
                landing_page: "BILLING",
                user_action: "PAY_NOW",
                return_url: `${process.env.PAYPAL_RETURN_URL}`,
                cancel_url: `${process.env.PAYPAL_CANCEL_URL}`
            }
        });

        // Execute the payment creation
        const order = await client.execute(request);

        res.status(200).json({
            success: true,
            orderId: order.result.id,
            approvalUrl: order.result.links.find(link => link.rel === 'approve').href
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Payment initiation failed', message: error.message });
    }
};

// Capture PayPal payment
exports.capturePayment = async (req, res) => {
    const { orderId } = req.body;
    try {
        const request = new paypal.orders.OrdersCaptureRequest(orderId);
        request.requestBody({});

        const capture = await client.execute(request);

        res.status(200).json({
            success: true,
            message: 'Payment successful',
            captureId: capture.result.id,
            status: capture.result.status
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Payment capture failed', message: error.message });
    }
};
