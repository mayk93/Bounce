#!/usr/bin/env bash

# Here, we do this:
#
# 1. We create a directory called jasmine.
# 2. We get Jasmine and write the archive to a file.
# 3. We unzip the archive.
# 4. We extract the library ( what we are interested in )
# 5. We delete the rest.

mkdir jasmine
cd jasmine
curl -L https://github.com/jasmine/jasmine/releases/download/v2.9.1/jasmine-standalone-2.9.1.zip > jasmine.zip
unzip jasmine.zip
cd ..
mv jasmine/lib .
rm -rf jasmine
