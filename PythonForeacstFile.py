from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/forecast', methods=['POST'])
def forecast_expenditure():
    # Parse the incoming JSON payload
    data = request.get_json()

    # Assuming data is structured correctly; you might want to add error checking here
    forecast_results = calculate_forecast(data['data'])

    # Prepare the response according to the ForecastDTO structure expected by the Java client
    formatted_response = format_forecast_response(forecast_results)

    return jsonify(formatted_response)


def calculate_forecast(expenditures):
    """
    Mock forecast calculation based on the received expenditures.
    Replace this with your actual forecasting logic.
    """
    forecast_results = {}
    for expenditure in expenditures:
        category = expenditure['category']
        total_amount = expenditure['totalAmount']

        # Simple aggregation example - sum amounts for each category
        if category in forecast_results:
            forecast_results[category] += total_amount
        else:
            forecast_results[category] = total_amount

    # Placeholder for actual forecast calculations
    # For example, applying specific forecasting models per category

    return forecast_results


def format_forecast_response(forecast_results):
    """
    Formats the forecast results to match the expected structure of ForecastDTO.
    """
    response = []
    for category, forecast_amount in forecast_results.items():
        # Constructing response to align with the ForecastDTO class in Java
        response.append({
            "category": category,
            "forecastAmount": forecast_amount  # Ensure this is a numeric value
        })
    return response


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
