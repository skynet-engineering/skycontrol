bootstrap:
	pip install -r requirements.txt

build:
	cd frontend && npm install && NODE_ENV=production npm run build

serve:
	PYTHONPATH=. python skycontrol/server.py
