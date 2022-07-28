# Build Script

# Run build operation
vue-cli-service build

# Zip /dist folder to /build/eris.zip
mkdir -p build
zip -r build/eris.zip dist
