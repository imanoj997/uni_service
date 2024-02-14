FROM python:3.11

# Set environment variables
ENV PYTHONUNBUFFERED 1

# Create a directory for the application and set it as the working directory
RUN mkdir /app
WORKDIR /app

# Copy the requirements.txt and install the dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code to the container
COPY . /app/
