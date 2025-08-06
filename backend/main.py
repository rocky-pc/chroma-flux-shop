import os
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer

app = FastAPI()

# Password hashing
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# In a real application, use hashed passwords
hashed_password = bcrypt_context.hash("password")

# Basic in-memory user database (for demonstration purposes)
fake_users_db = {
    "testuser": {
        "username": "testuser",
        # In a real application, use hashed passwords
        "password": hashed_password
    }
}

class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/login")
async def login(user: LoginRequest):    
    if user.username not in fake_users_db:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    hashed_password = fake_users_db[user.username]["password"].encode('utf-8')
    if not bcrypt_context.verify(user.password, hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# JWT settings
SECRET_KEY = os.environ.get("SECRET_KEY", "super-secret-key")  # Change this in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        return fake_users_db.get(username)
    except JWTError:
        raise credentials_exception

@app.get("/protected")
async def protected_route(current_user: dict = Depends(get_current_user)):
    return {"message": f"Hello {current_user['username']}, you are authenticated."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)