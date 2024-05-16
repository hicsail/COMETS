from flask import Flask, Response, request, send_from_directory
import os
import warnings
import cometspy as c
import cobra
import cobra.io
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
from pylab import *
import io
import matplotlib.pyplot as plt
import matplotlib
import json
import numpy as np
import math
import pandas
import requests
from dill import dumps, loads, dump
import dill
import boto3
from matplotlib import pyplot as plt
import matplotlib.colors, matplotlib.cm
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
from flask_cors import CORS, cross_origin

app = Flask(__name__)

def translation(name):
    dict = {
        "Escherichia coli Core": "E.Coli Core"
    }
    return dict[name]

def sendEmail(email, id):
    print("Email function hit")
    url = os.getenv('BASE_HOST_URL')
    try:
        req = requests.get(f'{url}/job/email/{email}/{id}')
        print('Email sent with code: ',req.status_code)
    except:
        raise Exception('Could not send email')
    
def uploadToS3(comets_result, id, email):
    print('uploadToS3 function called')
    # comets_result should be an array filled with files created by comets run 

    # Initiate S3 resource
    s3 = boto3.resource(
        's3',
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
        endpoint_url=os.getenv('ENDPOINT_URL')
    )
    # Initiate specific bucket on OpenStack
    bucket = s3.Bucket(os.getenv('BUCKET_NAME'))
    try:
        for file in comets_result:
            print(file)
            fileKey = f'{id}/{file}'
            upload = bucket.put_object(Body=open(file, 'rb'), Key=fileKey)
            os.remove(file)
        # Update job state and send email
        sendEmail(email, id)
        # Delete all uploaded file
    except Exception as error:
        print(f's3 upload failed: {error}')


@app.route('/result/<id>/<source>', methods=['GET'])
@cross_origin()
def get_result(id, source):
    
    s3 = boto3.resource(
        's3',
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
        endpoint_url=os.getenv('ENDPOINT_URL')
    )
    # Downloading the file from S3
    bucket = s3.Bucket(os.getenv('BUCKET_NAME'))
    prefix = id
    
    for object in bucket.objects.filter(Prefix = id):
        if not os.path.exists(prefix):
            os.makedirs(os.path.dirname(object.key), exist_ok=True)
        bucket.download_file(object.key, object.key)
    
    image_index = [20,40,60,80,100]
    with open(f'{id}/{id}.pkl', 'rb') as file:
        data = dill.load(file)
    if source == 'biomass':
        png_file_name = 'biomass.png'
        my_cmap = matplotlib.cm.get_cmap("magma")
        my_cmap.set_bad((0,0,0))
        plt.switch_backend('Agg')
        images = [data.get_biomass_image('e_coli_core', image_index[0]), 
                  data.get_biomass_image('e_coli_core', image_index[1]), 
                  data.get_biomass_image('e_coli_core', image_index[2]), 
                  data.get_biomass_image('e_coli_core', image_index[3]), 
                  data.get_biomass_image('e_coli_core', image_index[4])]
        fig, axs = plt.subplots(1, 5, figsize=(20, 4))
        # Display each image in a subplot
        for ax, img in zip(axs, images):
            cax = ax.imshow(img, cmap='viridis')  # You can specify a colormap (e.g., 'viridis', 'gray', etc.)
            ax.axis('off')  # Turn off axix
        fig.colorbar(cax, ax=axs[-1], orientation='vertical')
        fig.savefig(f'{id}/{png_file_name}', format='png', bbox_inches='tight')
    elif source == 'metabolite': 
        png_file_name = 'metabolite.png'
        my_cmap = matplotlib.cm.get_cmap("magma")
        my_cmap.set_bad((0,0,0))
        plt.switch_backend('Agg')
        images = [data.get_metabolite_image('glc__D_e', image_index[0]), 
                  data.get_metabolite_image('glc__D_e', image_index[1]), 
                  data.get_metabolite_image('glc__D_e', image_index[2]), 
                  data.get_metabolite_image('glc__D_e', image_index[3]), 
                  data.get_metabolite_image('glc__D_e', image_index[4])]
        fig, axs = plt.subplots(1, 5, figsize=(20, 4))
        # Display each image in a subplot
        for ax, img in zip(axs, images):
            cax = ax.imshow(img, cmap='viridis')  # You can specify a colormap (e.g., 'viridis', 'gray', etc.)
            ax.axis('off')  # Turn off axix
        fig.colorbar(cax, ax=axs[-1], orientation='vertical')
        fig.savefig(f'{id}/{png_file_name}', format='png', bbox_inches='tight')
    elif source == 'flux': 
        png_file_name = 'flux.png'
        my_cmap = matplotlib.cm.get_cmap("magma")
        my_cmap.set_bad((0,0,0))
        plt.switch_backend('Agg')
        images = [data.get_flux_image('e_coli_core','EX_glc__D_e', image_index[0]), 
                    data.get_flux_image('e_coli_core','EX_glc__D_e', image_index[1]), 
                    data.get_flux_image('e_coli_core','EX_glc__D_e', image_index[2]), 
                    data.get_flux_image('e_coli_core','EX_glc__D_e', image_index[3]), 
                    data.get_flux_image('e_coli_core','EX_glc__D_e', image_index[4])]
        fig, axs = plt.subplots(1, 5, figsize=(20, 4))
        # Display each image in a subplot
        for ax, img in zip(axs, images):
            cax = ax.imshow(img, cmap='viridis')  # You can specify a colormap (e.g., 'viridis', 'gray', etc.)
            ax.axis('off')  # Turn off axix
        fig.colorbar(cax, ax=axs[-1], orientation='vertical')
        fig.savefig(f'{id}/{png_file_name}', format='png', bbox_inches='tight')
        # value is .25 of maxCycles
    """
    Options to return from experiment results

    From comets module functions 
        * Biomass image (how to handle different organisms of the same model)
        * Metabolite image
        * Flux image
        * Metabolite Time Series
        * Species Exchange Flux (same problem with Biomass image)
    
    From comets dataframe
        * Total biomass
        * Fluxes
    
    """
    
    try:
        return send_from_directory(f'./{id}', png_file_name, as_attachment=True)
    except:
        raise Exception('Failed lol')

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

@app.route('/process', methods=['POST'])
def process():
    print('Started Processing!')
    
    os.environ['COMETS_GLOP'] = './comets_glop'
    """
    Files needed to save (8 files in total)
    * biomasslog
    * fluxlog
    * medialog
    * totalbiomass
    * COMETS_Manifest.txt
    * e_coli_core.cmd (or all model files)
    * .pkl file
    * .current_package
    * .current_script
    * .current_layout
    * .current_global
    """
    # Listing all files currently in current directory to check against
    current_files = os.listdir()

    
    
    # Creating the Job document on MongoDB
    body = {
            # filepath should be a signed URL made by S3
            "filepath": ''
        }
    url = os.getenv('BASE_HOST_URL')
    req = requests.post(f'{url}/job/create', body)
    job_obj = json.loads(req.content)
    job_id = job_obj["id"]


    data = json.loads(request.data.decode('utf-8').replace("'",'"'))
    print("data", data)
    requester_email = data['email']
    comets_layout = c.layout()
    comets_params = c.params()


    # Set all media metabolites constant for now (mmol) 
    # Dimensions of petri dish and test tube is different
    """
    Petri Dish 
    9 cm
    Grid = 100x100
    User gives concentration (mmol/cm3) and volume (ml)
    Formula for glucose
        height = volume / (3.14 * (3**2))
        glucose or acetate = (spaceWidth**2) * height * concentration

    Test Tube
        glucose or acetate = concentration * volume

        have to change Km (will be set at Global parameter level)
            Km = concentration
    """
    comets_layout.set_specific_metabolite('glc__D_e', 1e-5)

    # Everything else set constant at 1000
    comets_layout.set_specific_metabolite('o2_e', 1000)
    comets_layout.set_specific_metabolite('nh4_e', 1000)
    comets_layout.set_specific_metabolite('h2o_e', 1000)
    comets_layout.set_specific_metabolite('h_e', 1000)
    comets_layout.set_specific_metabolite('pi_e', 1000)

    # Load all models
    models = data['models']
    comets_model_arr = []
    # E.Coli model is using different path than other models
    for model in models:
        print("model", model)
        print()
        load_model = None
        
        model_name = translation(model['name'])
        # Load each model from either XML file or Cobra
        """
        Need to add more cases to this if/else statement with other model names
        """
        if model_name == 'E.Coli Core':
            load_model = cobra.io.load_model("textbook")
        
        comets_model = c.model(load_model)
        
        # Set each model parameters
        comets_model.neutral_drift_flag = True # model['demographicNoise']
        comets_model.add_neutral_drift_parameter(0.000001) # model['demographicNoiseAmp']
        comets_model.add_nonlinear_diffusion_parameters(0.0, 600000e-6, 1.0, 1.0,0.0) # (model['linearDiffusivity], model[nonLinearDiffusivity], 1.0, 1.0, 0.0)
        """
        ---Keeping this part commented out for now due to Demo---
        comets_model.change_km(model['Km'])
        comets_model.change_vmax(model['vMax'])
        """

        # All models share same value
        comets_model.change_bounds('EX_glc__D_e', -1000, 1000)
        comets_model.change_bounds('EX_ac_e', -1000, 1000)

        # Add models to array and to comets layout
        comets_model_arr.append(comets_model)


    # Create layout
    layout = data['layout']
    comets_layout.grid = [101,101] # constant?
    initi_population =[]
    layout_name = layout['name'].lower().replace('(','').replace(')','').replace(" ", "")
    print("layout_name", layout_name)
    if  layout_name == '9cmpetridishcentercolony':

        upper_bound = comets_layout.grid[0] - 1
        drop_radius = 5 
        for x in range(0,upper_bound):
            for y in range(0,upper_bound):
                if (x-(upper_bound/2))**2+(y-(upper_bound/2))**2 < drop_radius**2: 
                    initi_population.append([x,y,1e-6])
        
        for model in comets_model_arr:
            model.initial_pop = initi_population
            comets_layout.add_model(model)

    elif layout_name == '9cmpetridishrandomlawn':

        number_of_innoculates=100
        upper_bound = comets_layout.grid[0] - 1
        """
        
        """

        for i in range(np.int(number_of_innoculates*1.28)):
            x=int(upper_bound*np.random.random())
            y=int(upper_bound*np.random.random())
            if (x-(upper_bound/2))**2+(y-(upper_bound/2))**2<((upper_bound/2)-1)**2:
                initi_population.append([x,y,1e-6])
        for model in comets_model_arr:
            model.initial_pop = initi_population
            comets_layout.add_model(model)

    elif layout_name == 'testtube':
        initi_population.append([0,0,1e-6])
        for model in comets_model_arr:
            model.initial_pop = initi_population
            comets_layout.add_model(model)
    else:
        print('Default case')
    

    # Create media
    
    comets_params.set_param('numRunThreads', 1)
    comets_params.set_param('timeStep', 0.1) # timeStep = simulatedTime / maxCycles (number of steps)
    comets_params.set_param('maxCycles', 100) # Leave it as it is
    comets_params.set_param('spaceWidth',0.09) # 0.09 for petri dish, 0.05 for test tube
    comets_params.set_param('maxSpaceBiomass', 100)
    comets_params.set_param('BiomassLogRate', 10)
    comets_params.set_param('MediaLogRate', 10)
    comets_params.set_param("FluxLogRate", 10)
    comets_params.set_param('ExchangeStyle','Monod Style')
    comets_params.set_param('defaultDiffConst',6.0E-6)
    comets_params.set_param('biomassMotionStyle', 'ConvNonlin Diffusion 2D')
    comets_params.set_param('writeBiomassLog', True)
    comets_params.set_param('writeTotalBiomassLog', True)
    comets_params.set_param("writeFluxLog", True)
    comets_params.set_param('writeMediaLog', True)
    
    # Create the experiment
    experiment = c.comets(comets_layout, comets_params)

    # Run the simulation
    try:
        experiment.run(False)
        fileName = f'{job_id}.pkl'
        with open(fileName, 'wb') as file:
            dill.dump(experiment, file)

        updated_files_list = os.listdir()

        files_to_upload = []
        for file in updated_files_list:
            if file not in current_files:
                files_to_upload.append(file)
        # print(files_to_upload)
        uploadToS3(files_to_upload, job_id, requester_email)

    except:
        raise Exception('Not working', experiment.run_output)
    
        """
        available methods to call from "experiment"
        
        """
        
        # Need to delete the failed Job document on MongoDB using "id" field
    return 'Done'


if __name__ == '__main__':
    matplotlib.use('Agg')
    # os.environ['COMETS_GLOP'] = '/Users/zimlim/Desktop/comets-project/comets_glop'
    warnings.simplefilter(action='ignore', category=FutureWarning)
    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.run(debug=True)


