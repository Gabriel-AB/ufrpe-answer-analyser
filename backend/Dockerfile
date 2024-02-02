FROM python:3.11.7-slim-bookworm

ENV PYTHONUNBUFFERED 1
ENV PATH="/code/backend/scripts:${PATH}"

# Define default arguments
ARG DEV=false

# Create the code directory
RUN mkdir /code

# Upgrade pip
RUN pip install --upgrade pip

# Install system dependencies using apt
RUN apt-get update && apt-get install -y \
    postgresql-client \
    libjpeg-dev \
    gcc \
    libc-dev \
    linux-headers-amd64 \
    libpq-dev \
    zlib1g-dev

# Install Python dependencies
COPY ./requirements/ /code/requirements/
RUN if [ ${DEV} = "true" ]; then \
        pip install -r /code/requirements/dev.txt; \
    else \
        pip install -r /code/requirements/prod.txt; \
    fi

# Clean up apt packages
RUN apt-get purge -y gcc libc-dev linux-headers-amd64 && apt-get autoremove -y

# Set up the application directory
RUN mkdir -p /code/backend/app
WORKDIR /code/backend/app

# Copy the application files
COPY ./app /code/backend/app
COPY ./scripts /code/backend/scripts
COPY ./data /code/backend/data
COPY ./models /code/backend/models

# Make API scripts executable
RUN chmod +x /code/backend/scripts/*

# Set up volume directories
RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static

# Set the volume for external data
VOLUME [ "/vol/web" ]

# Set the default command to run the entrypoint script
CMD [ "entrypoint.sh" ]
