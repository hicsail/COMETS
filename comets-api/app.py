from flask import Flask, Response, request, send_from_directory
import os
import warnings
import cometspy as c
import cobra
import cobra.io
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from pylab import *
import matplotlib.pyplot as plt
import matplotlib
import json
import numpy as np
import requests
from dill import dumps, loads, dump
import dill
import boto3
from matplotlib import pyplot as plt
import matplotlib.colors, matplotlib.cm
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from flask_cors import CORS, cross_origin

app = Flask(__name__)

# 136 unique metabolites
rich_medium_metabolites = [
 'MNXM730135_e',
 'MNXM9_e',
 'MNXM726711_e',
 'MNXM731166_e',
 'MNXM1630_e',
 'MNXM107_e',
 'MNXM729302_e',
 'MNXM282_e',
 'MNXM731962_e',
 'cpd00110x_e',
 'MNXM730561_e',
 'MNXM7343_e',
 'MNXM60_e',
 'MNXM1_e',
 'MNXM1485_e',
 'BIOMASS_e',
 'MNXM732398_e',
 'MNXM729215_e',
 'MNXM735438_e',
 'MNXM95_e',
 'MNXM118_e',
 'MNXM117_e',
 'WATER_e',
 'MNXM1105684_e',
 'MNXM733186_e',
 'MNXM1562_e',
 'MNXM27_e',
 'MNXM58_e',
 'MNXM653_e',
 'MNXM90960_e',
 'MNXM13_e',
 'MNXM1949_e',
 'MNXM734847_e',
 'MNXM2255_e',
 'MNXM731953_e',
 'cpd00109x_e',
 'MNXM124_e',
 'MNXM735978_e',
 'MNXM39_e',
 'MNXM726712_e',
 'MNXM713_e',
 'MNXM128_e',
 'MNXM733435_e',
 'MNXM19009_e',
 'MNXM11814_e',
 'MNXM1107903_e'
]

minimal_core_metabolites = [
    'o2_e', 'nh4_e', 'h2o_e', 'h_e', 'pi_e', 'glc__D_e', 'ac_e'
]

def translation(name):
    dict = {
        "Escherichia coli Core": "E.Coli Core",
        "Escherichia coli": "E.Coli",
        "o2_e": "Oxygen (Metabolite)",
        "nh4_e": "Ammonia (Metabolite)",
        "h2o_e": "Water (Metabolite)",
        "h_e" : "Hydrogen (Metabolite)",
        "pi_e": "Phosphate (Metabolite)",
        "glc__D_e" : "Glucose (Metabolite)",
        "ac_e": "Acetate (Metabolite)"
    }
    return dict[name]

def sendEmail(email, id, status):
    url = os.getenv('BASE_HOST_URL')
    try:
        req = requests.get(f'{url}/job/email/{email}/{id}/{status}')
        print('Email sent with code: ',req.status_code)
    except:
        raise Exception('Could not send email')

def uploadToS3(comets_result, id, email):
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
            fileKey = f'{id}/{file[12:]}'
            upload = bucket.put_object(Body=open(file, 'rb'), Key=fileKey)
            os.remove(file)
        # Update job state and send email
        sendEmail(email, id, "success")
        # Delete all uploaded file
    except Exception as error:
        print(f's3 upload failed: {error}')


@app.route('/result/<id>/<source>', methods=['POST'])
@cross_origin()
def get_result(id, source):
    if not request.is_json:
        raise Exception ('No body detected with this request. Include a body to call this endpoint')

    req_data = request.get_json()
    """
    Different "source" will have different format for request body

    Biomass
    {
        model_id: string,
        model_name: string,
        time_step: num (not yet implemented)
    }

    Flux
    {
        model_id: string,
        model_name: string,
        flux_name: string,
        time_step: num (not yet implemented)
    }

    Metabolite
    {
        metabolite_name: string,
        metabolite_id: string,
        time_step: num (not yet implemented)
    }
    
    """

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
        if not os.path.exists(f'./sim_files/{prefix}'):
            os.makedirs(os.path.dirname(f'./sim_files/{object.key}'), exist_ok=True)
        bucket.download_file(object.key, f'./sim_files/{object.key}')
    
    """
    TODO 
    Need to replace the image_index with calculations of percentages of the max timeSteps
    """
    image_index = [20,40,60,80,100] 
    with open(f'./sim_files/{id}/{id}.pkl', 'rb') as file:
        data = dill.load(file)
    
    if source == 'biomass':
        model_id = req_data['model_id']
        model_name = req_data['model_name']   
        png_file_name = f'biomass_{model_id}.png'

        my_cmap = matplotlib.cm.get_cmap("magma")
        my_cmap.set_bad((0,0,0))

        plt.switch_backend('Agg')
        images = [data.get_biomass_image(model_id, image_index[0]),
                  data.get_biomass_image(model_id, image_index[1]),
                  data.get_biomass_image(model_id, image_index[2]),
                  data.get_biomass_image(model_id, image_index[3]),
                  data.get_biomass_image(model_id, image_index[4])]

        # Create the figure with the grid constraings
        fig = plt.figure(constrained_layout=True, figsize=(20, 8))
        gs = fig.add_gridspec(2, 6, width_ratios=[1, 1, 1, 1, 1, 0.25])

        # Display the petri dish images on the first row
        for index, img in enumerate(images):
            # Display the subplot in the given row
            ax = fig.add_subplot(gs[0, index])
            # Title based on the timestep in hours
            ax.set_title(str(image_index[index] // 10) + 'h')
            # Add the image in
            cax = ax.imshow(img, cmap='viridis')
            ax.axis('off')

        # Display the color bar on the side
        ax = fig.add_subplot(gs[0, 5])
        ax.axis('off')
        ax.set_title('grams/pixel')
        fig.colorbar(cax, ax=ax)
        fig.savefig(f'./sim_files/{id}/{png_file_name}', format='png', bbox_inches='tight')

    elif source == 'metabolite':
        metabolite_name = req_data['metabolite_name'] # ud for title of graph
        metabolite_id = req_data['metabolite_id']       
       
        
        png_file_name = f'metabolite_{metabolite_id.lower()}.png'

        my_cmap = matplotlib.cm.get_cmap("magma")
        my_cmap.set_bad((0,0,0))

        plt.switch_backend('Agg')

        images = [data.get_metabolite_image(metabolite_id, image_index[0]),
                  data.get_metabolite_image(metabolite_id, image_index[1]),
                  data.get_metabolite_image(metabolite_id, image_index[2]),
                  data.get_metabolite_image(metabolite_id, image_index[3]),
                  data.get_metabolite_image(metabolite_id, image_index[4])]

        fig, axs = plt.subplots(1, 5, figsize=(20, 4))

        # Create the figure with the grid constraings
        fig = plt.figure(constrained_layout=True, figsize=(20, 8))
        gs = fig.add_gridspec(2, 6, width_ratios=[1, 1, 1, 1, 1, 0.25])

        # Display the petri dish images on the first row
        for index, img in enumerate(images):
            # Display the subplot in the given row
            ax = fig.add_subplot(gs[0, index])
            # Title based on the timestep in hours
            ax.set_title(str(image_index[index] // 10) + 'h')
            # Add the image in
            cax = ax.imshow(img, cmap='viridis')
            ax.axis('off')

        # Display the color bar on the side
        ax = fig.add_subplot(gs[0, 5])
        ax.axis('off')
        ax.set_title('mmol/pixel')
        fig.colorbar(cax, ax=ax)

        fig.savefig(f'./sim_files/{id}/{png_file_name}', format='png', bbox_inches='tight')
        
    elif source == 'flux':
        
        model_id = req_data['model_id']
        model_name = req_data['model_name']
        flux_name = req_data['flux_name']
        flux_id = req_data['flux_id']
        
        
        png_file_name = f'flux_{model_id}_{flux_id}.png'

        my_cmap = matplotlib.cm.get_cmap("magma")
        my_cmap.set_bad((0,0,0))

        plt.switch_backend('Agg')

        images = [data.get_flux_image(model_id,flux_id, image_index[0]),
                    data.get_flux_image(model_id,flux_id, image_index[1]),
                    data.get_flux_image(model_id,flux_id, image_index[2]),
                    data.get_flux_image(model_id,flux_id, image_index[3]),
                    data.get_flux_image(model_id,flux_id, image_index[4])]

        # Create the figure with the grid constraings
        fig = plt.figure(constrained_layout=True, figsize=(20, 4))
        gs = fig.add_gridspec(1, 6, width_ratios=[1, 1, 1, 1, 1, 0.25])

        # Display the petri dish images on the first row
        for index, img in enumerate(images):
            # Display the subplot in the given row
            ax = fig.add_subplot(gs[0, index])
            # Title based on the timestep in hours
            ax.set_title(str(image_index[index] // 10) + 'h')
            # Add the image in
            cax = ax.imshow(img, cmap='viridis')
            ax.axis('off')

        # Display the color bar on the side
        ax = fig.add_subplot(gs[0, 5])
        ax.axis('off')
        ax.set_title('mmol/gh')
        fig.colorbar(cax, ax=ax)

        fig.savefig(f'./sim_files/{id}/{png_file_name}', format='png', bbox_inches='tight')
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
        response = send_from_directory(f'./sim_files/{id}', png_file_name, as_attachment=True)
        return response
    except:
        raise Exception('Failed lol')
    # return data

# add a route for only getting a graph
@app.route('/result/graph/<id>/<graph_type>', methods=['GET'])
@cross_origin()
def create_plot(graph_type, id):
    with open(f'./sim_files/{id}/{id}.pkl', 'rb') as file:
        experiment = dill.load(file)
    image = None
    file_name = None
    if graph_type == 'total_biomass':
        file_name = 'total_biomass.png'
        plt.switch_backend('Agg')
        fig, ax = plt.subplots()
        ax = experiment.total_biomass.plot(x='cycle', ax=ax)
        ax.set_ylabel("Biomass (gr.)")

        plt.savefig(f'./sim_files/{id}/{file_name}', format='png', bbox_inches='tight')
        plt.close(fig)

    elif graph_type == 'metabolite_time_series':
        file_name = 'metabolite_time_series.png'
        
        plt.switch_backend('Agg')
        fig, ax = plt.subplots()
        ax = experiment.get_metabolite_time_series().plot(x='cycle', ax=ax)
        ax.set_ylabel("Metabolite time series (gr.)")
        plt.savefig(f'./sim_files/{id}/metabolite_time_series.png', format='png', bbox_inches='tight')
        plt.close(fig)
    try:
        response = send_from_directory(f'./sim_files/{id}', file_name, as_attachment=True)
        
        return response
    except:
        raise Exception('Failed in making graph lol')

@app.route('/health')
def home():
    return "Server is up and running"

@app.route('/process', methods=['POST', 'OPTIONS'])
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
    current_files = os.listdir('./sim_files')
    url = os.getenv('BASE_HOST_URL')
    # Creating the Job document on MongoDB
    


    data = json.loads(request.data.decode('utf-8').replace("'",'"'))
    requester_email = data['email']
    comets_layout = c.layout()
    comets_params = c.params()

    # Breaking down data into easy-to-read pieces
    layout = data['layout']
    media = data['media']
    models = data['models']
    global_params = data['global_params']
    # {'global_params': {'simulatedTime': 1, 'timeSteps': 2, 'nutrientDiffusivity': 0, 'logFrequency': 0}, 'layout': {'name': '9cm Petri Dish Random Lawn', 'volume': 0}, 'models': [{'name': 'Escherichia coli Core', 'demographicNoise': False, 'demographicNoiseAmp': 0, 'vMax': 20, 'Km': 0, 'deathRate': 0, 'linearDiffusivity': 0, 'nonLinearDiffusivity': 0}], 'media': {'name': 'M9 Minimal Glucose', 'concentration': 12}, 'email': 'zimlim@bu.edu'}

    # Set all media metabolites constant for now (mmol)
    # Dimensions of petri dish and test tube is different
    """
    Petri Dish 
    9 cm
    Grid = 100x100
    User gives concentration (mmol/cm3) and volume (ml)
    Formula for glucose
        "4.5**2" because 4.5 is the radius for a 9 cm Petri Dish
        using formula: volume = pi*(r^2)*height 
        height = volume / (3.14 * (4.5**2))
        glucose or acetate = (spaceWidth**2) * height * concentration

    Test Tube
        glucose or acetate = concentration * volume

        have to change Km (will be set at Global parameter level)
            Km = concentration
    """
    mediaVolume = data['layout']['volume']
    mediaConcentration = data['media']['concentration']
    

    # metabolite and its concentration comes from "Choose Media"
    
    # Accounting for geometry of different layout types
    if "Petri Dish" in layout['name']:
        height = mediaVolume / (3.14 * (4.5**2))
        metabolite_amount = 0.09 * height * mediaConcentration
    elif "Test Tube" in layout['name']:
        metabolite_amount = mediaConcentration * mediaVolume
    
    metabolites_used = []
    if "Minimal" in media['name']:

        metabolite_lists = minimal_core_metabolites
        if "Glucose" in media['name']:
            metabolite_used = 'glc__D_e'
            comets_layout.set_specific_metabolite('ac_e', 1000)
        elif "Acetate" in media['name']:
            metabolite_used = 'ac_e'
            comets_layout.set_specific_metabolite('glc__D_e', 1000)
        comets_layout.set_specific_metabolite(metabolite_used, metabolite_amount)

    elif "Rich" in media['name']:
        metabolite_lists = rich_medium_metabolites

    for metabolite in metabolite_lists:
        comets_layout.set_specific_metabolite(metabolite, 1000)
        # When Rich Media Metabolite dictionary is available, name can be passed thru "translation()"
        metabolites_used.append({
            "name": metabolite,
            "id": metabolite
        })

    


    # Load all models
    
    comets_model_arr = []
    comets_model_id_arr = []
    # E.Coli model is using different path than other models
    for model in models:
        load_model = None
        model_name = model['name'].strip().lower()
        # Load each model from either XML file or Cobra
        """
        TODO
        Replace load_model with appropriate models once model files are received from Ilija
        """
        if model_name == 'escherichia coli core':
            load_model = cobra.io.load_model("textbook")
        elif model_name == 'escherichia coli':
            load_model = cobra.io.load_model("textbook")
        elif model_name == 'nitrosomonas europaea':
            load_model = cobra.io.read_sbml_model("./iGC535_modified_cobra.xml") 
        elif model_name == 'nitrobacter winogradskyi':
            load_model = cobra.io.read_sbml_model('./iFC579_modified_cobra.xml')
        else:
            sendEmail(requester_email, "000000000", "failure")
            raise Exception(f'No model found with name: {model_name}')
        
        comets_model = c.model(load_model)
        # Set each model parameters
        comets_model.neutral_drift_flag = bool(model['demographicNoise'])
        if bool(model['demographicNoise']):
            # if demographicNoise is false, dont set the next parameter
            comets_model.add_neutral_drift_parameter(float(model['demographicNoiseAmp']))
        else:
            # parameter can't be 0.0 or else an error is raised
            comets_model.add_neutral_drift_parameter(0.001)
        comets_model.add_nonlinear_diffusion_parameters(float(model['linearDiffusivity']), float(model['nonLinearDiffusivity']), 1.0, 1.0, 0.0)

        # All models share same value
        comets_model.change_bounds('EX_glc__D_e', -1000, 1000)
        comets_model.change_bounds('EX_ac_e', -1000, 1000)
        
        # Changing model Id if there's the same model added before
        model_id = comets_model.id
        iteration = 1
        while comets_model.id in [model['model_id'] for model in comets_model_id_arr]:
            comets_model.id = f'{model_id}_{iteration}'
            iteration += 1
            
    
        # Add models to array and to comets layout
        model_info_obj = {
            "name": model_name,
            "model_id": comets_model.id
        }
        comets_model_arr.append(comets_model)
        comets_model_id_arr.append(model_info_obj)


    # Create layout
    comets_layout.grid = [101,101] # constant?
    initi_population =[]
    layout_name = layout['name'].lower().replace('(','').replace(')','').replace(" ", "")
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

        for i in range(int(number_of_innoculates*1.28)):
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
        raise Exception(f"No layout found with associated name {layout['name']}")
    

    comets_params.set_param('numRunThreads', 1)
    comets_params.set_param('timeStep', floor(global_params['simulatedTime']/global_params['timeSteps'])) # timeStep = simulatedTime / maxCycles (number of steps) //might want to change variable name for timeSteps to maxCycles
    comets_params.set_param('maxCycles', global_params['timeSteps']) 
    if(layout_name == 'testtube'): # 0.09 for petri dish, 0.05 for test tube
        comets_params.set_param('spaceWidth',0.05) 
    else:
        comets_params.set_param('spaceWidth',0.09)
    comets_params.set_param('maxSpaceBiomass', 100)
    """
    TODO 
    take input from request body 
    """
    comets_params.set_param('defaultVmax', global_params['vMax'])
    comets_params.set_param('defaultKm', global_params['km'])
    
    comets_params.set_param('BiomassLogRate', global_params['logFrequency'])
    comets_params.set_param('MediaLogRate', global_params['logFrequency'])
    comets_params.set_param("FluxLogRate", global_params['logFrequency'])
    comets_params.set_param('ExchangeStyle','Monod Style')
    # comets_params.set_param('defaultDiffConst',6.0E-6)
    comets_params.set_param('defaultDiffConst', global_params['nutrientDiffusivity'])
    comets_params.set_param('biomassMotionStyle', 'ConvNonlin Diffusion 2D')
    comets_params.set_param('writeBiomassLog', True)
    comets_params.set_param('writeTotalBiomassLog', True)
    comets_params.set_param("writeFluxLog", True)
    comets_params.set_param('writeMediaLog', True)
    comets_params.set_param('comets_optimizer', 'GLOP')
    # Create the experiment
    experiment = c.comets(comets_layout, comets_params, 'sim_files/')
    experiment.set_classpath('bin', './comets_glop/bin/comets_scr.jar')

    body = {
            # filepath should be a signed URL made by S3
            "filepath": '',
            "model_info": comets_model_id_arr,
            "metabolites": metabolites_used

        }
    req = requests.post(f'{url}/job/create', json=body)
    
    job_obj = json.loads(req.content)
    job_id = job_obj["id"]
    # Run the simulation
    try:
        experiment.run(False)
        fileName = f'./sim_files/{job_id}.pkl'
        with open(fileName, 'wb') as file:
            dill.dump(experiment, file)
             
        # Dictionary comprehension to filter keys
        fluxes = []
        for i in experiment.fluxes_by_species:
            filtered_data = {k: v for k, v in experiment.fluxes_by_species[i].items() if 'EX' in k}
            fluxes_present = []
            for j in filtered_data:
                fluxes_present.append(j)
            fluxes_in_species = {
                "model_id": i,
                "fluxes": fluxes_present
            }
            fluxes.append(fluxes_in_species)
        update_body = {
            "id": job_id,
            "fluxes": fluxes
        }
        req = requests.patch(f'{url}/job/{job_id}', json=update_body)
        updated_files_list = os.listdir('./sim_files')

        files_to_upload = []
        for file in updated_files_list:
            if file not in current_files:
                files_to_upload.append(f'./sim_files/{file}')
        uploadToS3(files_to_upload, job_id, requester_email)

    except:
        # sendEmail(requester_email, '01234fxxdvxfaaow', 'failure')
        print(experiment.run_output)
        raise Exception('Not working', experiment.run_output)

    """
        available methods to call from "experiment"

        """

        # Need to delete the failed Job document on MongoDB using "id" field
    return 'Done'


if __name__ == '__main__':
    matplotlib.use('Agg')
    warnings.simplefilter(action='ignore', category=FutureWarning)
    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.run(host='0.0.0.0', debug=True)


