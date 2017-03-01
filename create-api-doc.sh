#!/bin/sh
pushd api-gateway
apidoc -i ./src/routes -o ../apidoc/
popd