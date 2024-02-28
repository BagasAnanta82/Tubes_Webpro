<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class publicAPI
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $id = $request->atk_id;

        if ($id != "5ea28465-8775-4154-ad32-35a16d74da1c") {
            return route("login");
        }

        return $next($request);
    }
}
