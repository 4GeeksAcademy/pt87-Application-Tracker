from typing import List
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import VARCHAR, Column, String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, DeclarativeBase, mapped_column, relationship
from sqlalchemy.ext.hybrid import hybrid_property
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime


class Base(DeclarativeBase):
    pass


db = SQLAlchemy(model_class=Base)


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(
        String(256), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    _password: Mapped[str] = mapped_column(
        "password", String(256), nullable=False)
    is_active: Mapped[bool] = mapped_column(
        Boolean(), nullable=False, default=True)

    def __repr__(self):
        return f"<User {self.username}>"

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, new_pass):
        self._password = generate_password_hash(new_pass)

    def check_password_hash(self, password):
        return check_password_hash(self.password, password)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
        }


class Application(Base):
    __tablename__ = "applications"

    id: Mapped[int] = mapped_column(primary_key=True)
    company: Mapped[str] = mapped_column(String(120), nullable=False)
    role: Mapped[str] = mapped_column(String(120), nullable=False)
    location: Mapped[str] = mapped_column(String(120), nullable=True)
    application_date: Mapped[str] = mapped_column(String(30), nullable=True)
    status: Mapped[str] = mapped_column(
        String(50), nullable=False, default="Interested")
    notes: Mapped[str] = mapped_column(String(500), nullable=True)
    employment_type: Mapped[str] = mapped_column(String(50), nullable=True)
    created_at: Mapped[str] = mapped_column(
        String(30), nullable=False, default=lambda: datetime.utcnow().isoformat()
    )
    user_id: Mapped[int] = mapped_column(
        db.ForeignKey("users.id"), nullable=False
    )

    def serialize(self):
        return {
            "id": self.id,
            "company": self.company,
            "role": self.role,
            "location": self.location,
            "application_date": self.application_date,
            "status": self.status,
            "notes": self.notes,
            "employment_type": self.employment_type,
            "created_at": self.created_at,
            "user_id": self.user_id,
        }
