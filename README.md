Tournament Viewer
=================
A small static site to explore predictions in the 2016 Kaggle Machine Learning competition.  

See a sample with the sample predictions at http://colcarroll.github.io/march_madness_viewer/

Usage:
------
There are two good ways to use this:

-Locally:
    1. Checkout this repo
    2. `cd tourney_viewer`
    2. `cp ~/path/to/your/predictions.csv helpers/preds.csv`
    3. `python helpers/prep_data.py` (This creates a json file in assets that the js
    app uses.  Tested with python2.7 and 3.5.)
    4. `python -m SimpleHTTPServer 8000` will start serving the site at http://localhost:8000/
   
-On the web:
    Same as the above, but fork the repo, checkout the branch `gh-pages`, and instead of
    step 4, check in `helpers/preds.json`.  Once you push, the site should be live at
    http://yourname.github.io/tourney_viewer/
