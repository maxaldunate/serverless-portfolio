import boto3
import StringIO
import zipfile
import mimetypes

s3 = boto3.resource('s3')
portfolio_bucket = s3.Bucket('serverless.rootofpi.co.uk')
build_bucket = s3.Bucket('serverless-portfolio')

portfolio_zip = StringIO.StringIO()

build_bucket.download_fileobj('serverlessbuild.zip',portfolio_zip)

with zipfile.ZipFile(portfolio_zip) as myzip:
    for nm in myzip.namelist():
        obj = myzip.open(nm)
        portfolio_bucket.upload_fileobj(obj, nm,
          # Remember mimetypes guesses using file extension so make sure exists!
          ExtraArgs={'ContentType': mimetypes.guess_type(nm)[0]})
        portfolio_bucket.Object(nm).Acl().put(ACL='public-read')
