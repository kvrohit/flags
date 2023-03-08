#!/usr/bin/env bash

jq ". += [{ iso_country_code: \"$1\", country_name: \"$2\"}]" src/assets/flags.json > src/assets/flags-updated.json
mv src/assets/flags.json src/assets/flags-old.json
mv src/assets/flags-updated.json src/assets/flags.json
