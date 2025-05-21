import pandas as pd
import requests
import os, csv

API_KEY = os.getenv("CENSUS_API_KEY")
print(API_KEY)

# Load CSV once into memory


def get_fips_code(name):
    name = name.strip().lower()
    with open("standards/states.csv", mode="r") as file:
        reader = csv.DictReader(file)
        for row in reader:
            if row["Name"].strip().lower() == name:
                return row["FIPS"]
    return f"Invalid name: {name}"
  
def get_population(state_name):
  fips = get_fips_code(state_name)
  print(f"FIPS code for {state_name}: {fips}")
  if not fips:
    return f"Invalid state name: {state_name}"
  
  url = f"https://api.census.gov/data/2022/acs/acs1?get=B01003_001E&for=state:{fips}&key={API_KEY}"
  try:
    response = requests.get(url)
    response.raise_for_status()
    data = response.json()
    return int(data[1][0])
  except Exception as e:
    return f"Error fetching data: {e}"
  
def filter_population_by_age_range(pop, low=18, high=99):
    total_percentage = 0.0

    # Open and read the CSV file
    with open("standards/us_age_distribution_estimate.csv", mode="r") as file:
        reader = csv.DictReader(file)
        
        # Iterate over each row in the CSV
        for row in reader:
            age = int(row["Age"])
            percentage = float(row["Percent_of_US_Population"])
            
            # Add percentages for ages within the range [low, high]
            if low <= age <= high:
                total_percentage += percentage

    # Convert percentage to a fraction and multiply by the population
    fraction = total_percentage / 100
    result = int(pop * fraction)

    return result


  
  
cal_pop = get_population("California")  # Example usage
print("Population: ", cal_pop)  # Example usage
print("Population from 18-25: ", filter_population_by_age_range(cal_pop, 18, 25))  # Example usage