from flask import Flask, Response
import os
import warnings
import cometspy as c
import cobra
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
import io
import matplotlib.pyplot as plt
import matplotlib
import requests

app = Flask(__name__)

def create_plot(experiment):
    fig, ax = plt.subplots()
    ax = experiment.total_biomass.plot(x='cycle', ax=ax)
    ax.set_ylabel("Biomass (gr.)")

    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    plt.close(fig)
    return buf

@app.route('/health')
def home():
    return "Server is up and running"

@app.route('/process')
def process():
    print('Started Processing!')

    email = 'shahrishi108@gmail.com' # set email to be a var (will read this from api call when params are finalized)

    # Create empty 1x1 layout
    test_tube = c.layout()

    # Set metabolites
    test_tube.set_specific_metabolite('glc__D_e', 0.011) # glucose
    test_tube.set_specific_metabolite('o2_e', 1000) # oxygen

    # Add the rest of nutrients unlimited (ammonia, phosphate, water and protons)
    test_tube.set_specific_metabolite('nh4_e', 1000)
    test_tube.set_specific_metabolite('pi_e', 1000)
    test_tube.set_specific_metabolite('h2o_e', 1000)
    test_tube.set_specific_metabolite('h_e', 1000)

    e_coli_cobra = cobra.io.load_model('textbook')
    e_coli = c.model(e_coli_cobra) # build a cobra model from loaded model

    # remove the bounds from glucose import (will be set dynamically by COMETS)
    e_coli.change_bounds('EX_glc__D_e', -1000, 1000)
    e_coli.change_bounds('EX_ac_e', -1000, 1000)

    # set the model's initial biomass
    e_coli.initial_pop = [0, 0, 5e-6]

    # add model to the test_tube
    test_tube.add_model(e_coli)

    sim_params = c.params()

    sim_params.set_param('defaultVmax', 18.5)
    sim_params.set_param('defaultKm', 0.000015)
    sim_params.set_param('maxCycles', 600)
    sim_params.set_param('timeStep', 0.01)
    sim_params.set_param('spaceWidth', 1)
    sim_params.set_param('maxSpaceBiomass', 10)
    sim_params.set_param('minSpaceBiomass', 1e-11)
    sim_params.set_param('writeMediaLog', True)
    sim_params.set_param('writeFluxLog', True)
    sim_params.set_param('FluxLogRate', 1)

    # Create the experiment
    experiment = c.comets(test_tube, sim_params)

    success=False

    # Run the simulation
    try:
        experiment.run()
        success=True

    except:
        print('Errors with experiment')


    url = "https://notification.sail.codes/email/send"

    if success:
        data = {
            "from": "noreply@mail.sail.codes",
            "to": [email],  
            "subject": "COMETS Simulation Success",
            "message": "Your comets simulation has finished running!",
        }

    else:
        data = {
            "from": "noreply@mail.sail.codes",
            "to": [email],  
            "subject": "COMETS Simulation Failure",
            "message": "Your comets simulation has failed",
        }


    # Headers 
    headers = {
        "Content-Type": "application/json", 
    }

    # Sending the request
    response = requests.post(url, json=data, headers=headers)
    if response.status_code == 200:
        print("Email sent successfully.")
    else:
        print("Failed to send email. Status code:", response.status_code)

    return 'Done'



if __name__ == '__main__':
    matplotlib.use('Agg')
    os.environ['COMETS_GLOP'] = './comets_glop'
    warnings.simplefilter(action='ignore', category=FutureWarning)
    app.run(debug=True)