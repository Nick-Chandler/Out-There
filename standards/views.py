from django.shortcuts import render

def home(request):
  return render(request, 'home.html')

def standards(request):
  return render(request, 'standards.html')

def standards_results(request, gender, state, lower_age, higher_age, min_income, race, min_height, max_height, education, politics):
  context = {
    'gender': gender,
    'state': state,
    'lower_age': lower_age,
    'higher_age': higher_age,
    'min_income': min_income,
    'race': race,
    'min_height': min_height,
    'max_height': max_height,
    'education': education,
    'politics': politics,
    }
  return render(request, 'standards_results.html', context)
