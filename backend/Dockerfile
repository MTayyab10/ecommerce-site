
FROM python:3.9.13-slim-buster

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Create and set the working directory
WORKDIR /api

# RUN pip install django django-cors-headers

# Install system dependencies
RUN apt-get update && apt-get install -y libpq-dev gcc

# Install Python dependencies
COPY requirements.txt /api/
RUN pip install --no-cache-dir -r requirements.txt


# Copy the project files into the container
COPY . .

# Expose the port that your Django app will run on
EXPOSE 8000

# Start the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
