package core

type KeyvalError struct {
	IsKeyvalError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewKeyvalError(code string, msg string, ctx *Context) *KeyvalError {
	return &KeyvalError{
		IsKeyvalError: true,
		Sdk:              "Keyval",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *KeyvalError) Error() string {
	return e.Msg
}
