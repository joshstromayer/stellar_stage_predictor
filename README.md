# Stellar Stage Classification 
A simple website used to classify a star and provide a illustration based off unique user inputs.

## Description 

The Stellar Classification System constists of spectral classification and luminosity classification. The Gaia DR3 dataset has spectral classification for 626016 stars, 26016 stars for spectral type 'O' and 100k stars for spectral classes 'B', 'A', 'F', 'G', 'K', 'M'. Spectral classes are primarily influenced by the temperature of the star, whilst the luminosity classes are mostly influced by mass, radius and the absolute magnitude of the star. The luminosity classes tell you the stage of the star in its star cycle, examples include Main Sequence (V) and Giants (III). When combining both the spectral classification and the luminosity classification, the full stellar stage classification is given, i.e. "A III". 

## How to use it 

The interractive webpage is designed to provide a smooth user experience.
You will be asked to enter 4 values: the **Mass**, **Radius**, **Temperature**, and **Absolute Magnitude**. 
- If your inputs fall within the valid ranges for a luminosity classification, a full classification will be returned. 
- If the inputs are outside of those ranges, only a spectral classification will be returned. 

## How it was done 

The Gaia DR3 dataset was split into sub-datasets based off the spectral classes of the stars. Each dataset was trained using a KMeans model with 3 cluster centres, anticipating the mathematically curated clusters to align with the data ranges of the luminosity classes. A script which ran through the different values for the number of clusters on the different spectral classes showed that training the model to find 3 clusters was optimal. The 3 luminosity classes that were targetted are the Main Sequence (V), Giant (III), and the Supergiant (I) stars.

As explained later on in this file, the unsupervised learning training was unsuccessful. Whilst the clusters created were mathematically accurate, and would allow any new stars to be confidently categorised into one of the clusters, unfortunately, the cluster centres did not align with the luminosity classifications. 

The JavaScript code compares the user inputs with a predefined range of values. First the temperature is used to place the star into its spectral class. Then the mass, radius and absolute magnitude are considered for the luminosity classification. If the data provided by the user does not perfectly fall in the ranges of each feature, no luminosity class will be provided - only the spectral class. This grants the user freedom to produce their own star, with unique values, whilst having to consider the risk of not having it classified. This algorithm is much more efficient than the unsupervised learning clusters for classificaiton, since there is no room for error, no possibility of an incorrect classification. 

## Why the Unsupervised-Learning models failed

Upon analysis of the sub-datasets, it was found that the Gaia DR3 data was noisy and the spectral classifications contained stars that did not follow the typical ranges for the values in that spectral class. This caused the model training to be slightly less efficient, this is due to the fact that the unsupervised learning models were trying to identify patterns on data with a small percentage of error. 

The KMeans models were trained on 2 features, the radius ("Rad") and the absolute magnitude ("GMAG"), the two features that influence luminosity classification the most. The clusters were accurately produced - according to the mathematical tools of accuracy for an unsupervised learning model, a (high) silhouette score and a clean scatter plot. Although, these clusters did not align with the typical ranges for the luminosity classes as well as initially desired. The general trend amongst the spectral classes were that the main sequence was confidently and accurately identified into their own cluster, but the giants and supergiants were not. With the exception being the dataset for spectral class 'M', the cluster centres aligned perfectly with the luminosity classification data. 

## Installation 

If you wish to download and run the model yourself, there are a few simple steps you must follow: 
1. Clone the repository: 
- Navigate to the desired folder in your terminal ("cd ~ /Documents/Example").
- Clone the repository "git clone https://www.github.com/joshstromayer/stellar_stage_predictor.git"
- Open the new folder "stellar_stage_predictor" in your preferred IDE.

2. Run the notebook: 
- In the first cell, there is a command line of code "pip3 install (...)", run this code in your terminal. (Use 'pip' for Windows or 'pip3' for Mac).
- Once all the libraries are downloaded, run the rest of the notebook!

All the Pre-Processing code, plots, model creation and testing are in that one notebook! 

## Contributing 

If you would like to contribute, feel free to 'fork' the repostitory and make all the changes you would like. 
Here are some ideas for you to get started: 
- Use a different dataset, to trainand test the model on different data, possibly with different parameters.
- Change the styling of the website, make it custom to your liking...
- Adjust the JavaScript code to change the output to the user (numerical output, a graph, etc.).